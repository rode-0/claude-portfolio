import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

export enum CapabilityCategory {
  CODE_GENERATION = 'code-generation',
  MULTI_AGENT = 'multi-agent',
  TDD = 'tdd',
  SECURITY = 'security',
  API_DESIGN = 'api-design',
  DATABASE = 'database',
  DEVOPS = 'devops',
}

interface CapabilityAttributes {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: CapabilityCategory;
  icon: string | null;
  features: string[] | null;
  codeExample: string | null;
  codeLanguage: string | null;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CapabilityCreationAttributes
  extends Optional<CapabilityAttributes, 'id' | 'description' | 'icon' | 'features' | 'codeExample' | 'codeLanguage' | 'order'> {}

class Capability
  extends Model<CapabilityAttributes, CapabilityCreationAttributes>
  implements CapabilityAttributes
{
  public id!: string;
  public title!: string;
  public slug!: string;
  public description!: string | null;
  public category!: CapabilityCategory;
  public icon!: string | null;
  public features!: string[] | null;
  public codeExample!: string | null;
  public codeLanguage!: string | null;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Capability.init(
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(CapabilityCategory)),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    codeExample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    codeLanguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'capabilities',
    modelName: 'Capability',
  }
);

export default Capability;
