module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'sent',
    },
    sender: {
      type: Sequelize.STRING,
      references: {
        model: 'Contacts',
        key: 'phoneNumber',
      },
      allowNull: false,
      onDelete: 'cascade'
    },
    receiver: {
      type: Sequelize.STRING,
      references: {
        model: 'Contacts',
        key: 'phoneNumber',
      },
      allowNull: true,
      onDelete: 'set null',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Messages'),
};
