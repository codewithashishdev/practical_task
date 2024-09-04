module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        "tbl_user",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING(255)
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            resetToken: {
                type: DataTypes.STRING(500),
            },
            profile_picture: {
                type: DataTypes.TEXT,
            },
            resetTokenExpiration: {
                type: DataTypes.DATE,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            }
        },
        {
            indexes: [
                {
                    fields: ["id", "username", "email"],
                },
            ],
            tableName: "tbl_user",
            timestamps: false
        }
    );
    User.sync();
    return User;
};