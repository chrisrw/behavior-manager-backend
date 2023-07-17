// import { Model, DataTypes, Sequelize } from 'sequelize';

// export class Infraction extends Model {
//   public id!: number;
//   public student_name!: string;
//   public student_number!: string;
//   public date!: Date;
//   public period!: number;
//   public incident_description!: string;
//   public userId!: number; // Foreign key to associate with the User model

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   public static associate(models: any) {
//     Infraction.belongsTo(models.User, { foreignKey: 'userId' });
//   }
// }

// export function initInfractionModel(sequelize: Sequelize) {
//   Infraction.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       student_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       student_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       period: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       incident_description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Infraction',
//     }
//   );
// }

// export class User extends Model {
//   public id!: number;
//   public email!: string;
//   public password!: string;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   public readonly infractions?: Infraction[];

//   public static associate(models: any) {
//     User.hasMany(models.Infraction, { foreignKey: 'userId' });
//   }
// }

// export function initUserModel(sequelize: Sequelize) {
//   User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'User',
//     }
//   );
// }
