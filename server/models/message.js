
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sent',
    },
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      foreignKey: 'sender',
    });
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiver',
    });
  };
  return Message;
};
