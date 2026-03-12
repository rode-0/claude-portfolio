import sequelize from '../config';
import Capability from './Capability';
import Project from './Project';

// Define associations
Capability.hasMany(Project, {
  foreignKey: 'capabilityId',
  as: 'projects',
});

Project.belongsTo(Capability, {
  foreignKey: 'capabilityId',
  as: 'capability',
});

export { sequelize, Capability, Project };
