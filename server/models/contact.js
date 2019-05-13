
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'sender',
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiver',
    });
  };
  return Contact;
};
