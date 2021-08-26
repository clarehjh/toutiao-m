module.exports = {
  plugins: {
    //自动添加浏览器厂商声明前缀，用来兼容不同浏览器，vuecli 已经注入配置，到.browserslistrc文件配置
    // autoprefixer: {
    //   browsers: ["Android >= 4.0", "iOS >= 8"]
    // },
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"]
    }
  }
};
