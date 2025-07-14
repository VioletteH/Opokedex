import { Sequelize } from 'sequelize';

const dbUrl = process.env.NODE_ENV === 'test'
  ? process.env.DB_URL 
  : process.env.PG_URL; 

const sequelize = new Sequelize(dbUrl, {
  define: {
    underscored: true,
    timestamps: false
  },
});

export default sequelize;

