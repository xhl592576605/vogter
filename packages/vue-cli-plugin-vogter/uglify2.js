var fs = require('fs');
var UglifyJS = require('uglify-js');
var opt = {
  parse: {
    // parse options
  },
  compress: {
    // compress options
  },
  mangle: {
    // mangle options
    // toplevel: true,
    properties: {
      // mangle property options
    }
  },
  output: {
    // output options
  },
  sourceMap: {
    // source map options
  },
  nameCache: null, // or specify a name cache object
  toplevel: true,
  ie8: false,
  warnings: false,
}
// 读取一个文件，压缩之
function buildOne (flieIn, fileOut) {
  var origCode = fs.readFileSync(flieIn, 'utf8');
  var finalCode = UglifyJS.minify(origCode, {
    mangle: true,
    toplevel: true,
    v8: true
  });
  fs.writeFileSync(fileOut, finalCode.code, 'utf8');
  fs.writeFileSync(`${fileOut}.map`, finalCode.map, 'utf8');
}

buildOne('./plugin.js', './index.js')
buildOne('./styleguide.conf.js', './styleguide.js')