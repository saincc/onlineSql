<template>
  <div>
    <el-card class="box-card card">
      <h2>使用须知</h2>
      <div style="size: 10px;color: #303032">该网页可支持普通表格的sql操作，可直接复制粘贴或上传excel，便于练习sql语句</div>
      <div class="info">
        <ol>
          <li>不支持两个数据库之间的操作</li>
          <li>可选择通过上传表格（xlsx/xls/csv格式）或执行sql语句添加表格，不支持导入具有<b>合并单元格</b>的表格（会出现问题）</li>
          <li>可随时对原表格进行修改</li>
          <li>查询时列名请用[0][1][2]等代替<br>例如：select * from table1 where [0]>4</li>
          <li>不支持修改列名</li>
          <li>查询结果从右侧划出，增删改操作结果将直接显示在表格中</li>
          <li>本网页数据库在浏览器中实现，刷新即清空数据，没有数据泄露问题</li>
        </ol>
      </div>
    </el-card>
    <el-card class="box-card card">
      <h2>示例</h2>
      <div class="info">
        <ol>
          <li>
            <b>查询</b><br/>
            select * from table1 where [2]>14<br/>
            select * from table1 where [4]="男"<br/>
            select * from table1 limit 2 <br/>
            select * from table2 where [4] like '%g'<br/>
          </li>
          <li>
            <b>修改</b><br/>
            update table1 set [1] = "16" where [0] = "1801"<br/>
          </li>
          <li>
            <b>增加</b><br/>
            insert into table1 values(1,2,3)<br/>
            insert into table1([0],[2],[3]) values(1,2,3)<br/>
          </li>
          <li>
            <b>删除</b><br/>
            delete from table1 where [1]>14<br/>
            delete from table1 where [3]="男"<br/>
          </li>
        </ol>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
name: "Info.vue"
}
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
.info {
  text-align: left;
}
.info li {
  margin-bottom: 5px;
}
</style>
