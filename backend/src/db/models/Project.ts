import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface ProjectAttributes {
  id: string;
  title: string;
  description: string | null;
  techStack: string[] | null;
  imageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  capabilityId: string | null;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectCreationAttributes
  extends Optional<
    ProjectAttributes,
    'id' | 'description' | 'techStack' | 'imageUrl' | 'githubUrl' | 'liveUrl' | 'capabilityId' | 'featured'
  > {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: string;
  public title!: string;
  public description!: string | null;
  public techStack!: string[] | null;
  public imageUrl!: string | null;
  public githubUrl!: string | null;
  public liveUrl!: string | null;
  public capabilityId!: string | null;
  public featured!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    techStack: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    liveUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capabilityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'capabilities',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  }
);

export default Project;
