// sql语句

// 服务器分组
const ServerGroup = {
    selectAll: 'SELECT * FROM server_groups;',
    addGroup:"INSERT INTO server_groups(server_group_name,server_group_description,is_deleted) values(?,?,?)"
}

module.exports = {
    ServerGroup
}