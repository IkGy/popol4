const Sequelize = require("sequelize");


class Board extends Sequelize.Model{
  static initiate(sequelize){
    Board.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //기본키
        autoIncrement: true, //자동생성
        allowNull: false,
        comment: "식별자 ID (기본키)",
      },
      admin_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        comment:"수정/추가 한 관리자 이름"
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "제목",
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "내용",
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "이미지 주소",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        comment: "최초등록 시간",
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "업데이트 시간",
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Board',
      tableName: 'board',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
  }
  static associate(db) {
    db.Board.belongsTo(db.Admin, { foreignKey: 'admin_id', targetKey: 'id' });
  }
}

module.exports = Board;