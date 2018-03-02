// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

const classRegex = /\.[\w\d]+/g;
const ignoreRegex = /ignore_missing_classes/;

module.exports = {
  process(fileData, filename) {
    if (ignoreRegex.test(fileData)) {
      return 'module.exports = new Proxy({}, {get: (o, name) =>  name });';
    }
    const allClasses = (fileData.match(classRegex) || []).map(s => s.replace('.', ''));
    return `
      const allClasses = ${JSON.stringify(allClasses)};
      module.exports = new Proxy({}, {get: (o, name) => {
        if(!allClasses.includes(name)){
          throw new Error(\`class '\${name}\' not found in ${filename}\`);
        }
        return name;
      }});
    `;
  },
};
