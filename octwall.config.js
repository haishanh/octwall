module.exports = {
  /*
   * svgSprite is an array
   * contains exist svg sprites under src directory
   */

  svgSprite: [
  //   'svg-sprite-action-symbol.svg',
  //   'svg-sprite-places-symbol.svg',
  //   'svg-sprite-hardware-symbol.svg',
  //   'svg-sprite-social-symbol.svg',
  //   'svg-sprite-maps-symbol.svg',
    'octicons-sprite.svg'
  ],

  /*
   * svgDir is an array
   * contains diretories which themeselves contains some svg files.
   * A svg sprite file will be built for each diretory.
   * For example, dir 'octicons' contains github svg icon files,
   * a svg sprite file like 'octicons-sprite.svg' will be built using svgs in it.
   */

  // svgDir: ['octicons'],

  /*
   * exclude is a regEx
   * match svgs which you don't want them to show up
   */
  exclude: /(arrow.*|logo-gi.*|ic_all_out.*)/,

  /*
   * include is a regEx
   * match svgs which you `really` want them to show up
   */
  include: /(octoface|heart|markdown|squirrel)/,

  colors: [
    'belize-hole',
    'green-sea',
    'nephritis',
    'wisteria',
    'midnight-blue',
    'orange',
    'pumpkin',
    'pomegranate',
    'asbestos'
  ]
};