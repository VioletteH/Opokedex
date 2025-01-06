import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
    timestamps: false
  },
});

export default sequelize;

