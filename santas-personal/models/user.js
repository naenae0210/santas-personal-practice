module.exports = (sequelize, Sequelize) => {
  //const Post = require("./post")(sequelize, Sequelize);
  class User extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let user = await User.findByPk(id);
        if (user) {
          user = await User.update(params, {
            where: {
              id: id
            }
          });
        }
        return user;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let user = await User.findByPk(id);
        if (user) {
          user = await User.destroy({
            where: {
              id: id
            }
          });
        }
        return user;
      } catch (err) {
        console.log(err);
      }
    }

  };

  User.init({
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth: {
      type: Sequelize.DATEONLY,
    },
    nickname: {
      type: Sequelize.STRING,
    }
  }, {
    sequelize,
    modelName: 'user'
  });

  return User;
};
