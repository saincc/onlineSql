<template>
  <div class="home">
    <h2><i class="el-icon-s-promotion"></i> 在线sql执行</h2>
    <div class="tables" style="text-align: left">
      <div class="BtnDiv" style="margin-bottom: 10px;">
      <el-row>
        <el-col :span="3">
          <el-upload
            ref="inputDOM"
            accept=".csv,.xlsx,.xls"
            action=""
            class="upload-demo"
            :on-change="importf">
            <el-button  type="primary" icon="el-icon-upload2" round>上传表格</el-button>
          </el-upload>
        </el-col>
        <el-col :span="3">
          <el-button v-on:click="addTab('Table')" icon="el-icon-circle-plus-outline" round>新建表格</el-button>
        </el-col>
        <el-col :span="3">
          <el-button v-on:click="loadTab()" icon="el-icon-download" round>导入预设</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" v-on:click="clearTab()" icon="el-icon-delete"  round>清空表格</el-button>
        </el-col>
      </el-row>
      <div slot="tip" class="el-upload__tip">可以点击按钮上传表格或直接复制粘贴</div>
      </div>
        <el-tabs  type="border-card" v-model="editableTabsValue" closable @tab-remove="removeTab">
          <el-tab-pane  v-for="item in editableTabs" :key="item.name"  :name="item.name">
            <span slot="label"><i class="el-icon-document"></i> {{ item.label }}</span>
            <hot-table ref="Tables" :settings="settings" licenseKey="non-commercial-and-evaluation"></hot-table>
          </el-tab-pane>
        </el-tabs>
    </div>
    <div class="editor" style="margin-top: 15px">
      <el-card class="box-card" shadow="always" style="text-align: left">
        <div slot="header" class="clearfix" style="text-align: center">
          <span><i class="el-icon-edit"></i> sql语句</span>
          <div style="text-align: left;">
            <div class="textLink">
            <el-link v-on:click="formatSql" icon="el-icon-magic-stick">格式化</el-link>
            </div>
            <div class="textLink">
            <el-link v-on:click="compressSql" icon="el-icon-files">压缩</el-link>
            </div>
            <div class="textLink">
            <el-link v-on:click="upperSql" icon="el-icon-arrow-up">大写</el-link>
            </div>
            <div class="textLink">
            <el-link v-on:click="lowerSql" icon="el-icon-arrow-down">小写</el-link>
            </div>
            <div class="textLink">
            <el-link v-on:click="cleanSql" type="danger" icon="el-icon-delete">清空</el-link>
            </div>
          </div>
        </div>
        <MonacoEditor
            ref="editor"
            height="100"
            language="sql"
            theme="vs"
            :code="code"
            :editorOptions="options"
            @mounted="onMounted">
        </MonacoEditor>
        <div class="BntDiv">
          <el-button type="primary" class="bnt" v-on:click="executeSql" icon="el-icon-mouse" round>点击运行</el-button>
        </div>
      </el-card>
    </div>
    <el-drawer
        title="查询结果"
        size="40%"
        append-to-body="true"
        :visible.sync="drawer">
      <hot-table ref="Result" :settings="settings2" licenseKey="non-commercial-and-evaluation"></hot-table>
    </el-drawer>
  </div>
</template>
<script>
import MonacoEditor from 'vue-monaco-editor'
import { HotTable } from '@handsontable/vue';
import sqlFormatter from "sql-formatter";
import "handsontable/languages/zh-CN"; //引入中文语言包

let alasql = require('alasql')
export default {
  name: "Index",
  components: {
    MonacoEditor,
    HotTable,
  },
  data: function() {
    return {
      drawer: false,
      code: '',
      options: {
        selectOnLineNumbers: false,
        automaticLayout: true,
      },
      settings: {
        language: 'zh-CN',
        startRows: 5,
        startCols: 5,
        colHeaders: true,
        rowHeaders: true,
        fillHandle: true,
        height: 300,
        copyPaste: true,
        manualColumnResize: true, // 列拉伸,调整大小
        manualRowResize: true, // 行拉伸,调整大小
        manualColumnMove: true, // 拖动交换列
        manualRowMove: true, // 拖动交换行
        mergeCells: true, // 合并单元格 或者提前合并
        contextMenu: true,
        selectionMode: 'multiple',
      },
      settings2: {
        language: 'zh-CN',
        colHeaders: true,
        rowHeaders: true,
        fillHandle: true,
        height: 300,
        copyPaste: true,
        stretchH: "all",
        manualColumnResize: true, // 列拉伸,调整大小
        manualRowResize: true, // 行拉伸,调整大小
        selectionMode: 'multiple',
      },
      tabIndex: 1,
      editableTabsValue: '1',
      editableTabs: [{
        label: 'Table1',
        name: '1',
      }]
    }
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    importf() {
      // 上传表格数据
      let _this = this;
      this.file = event.currentTarget.files[0];
      var f = this.file;
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function() {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for(var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require('xlsx');
          wb = XLSX.read(binary, {
            type: 'binary'
          });
          // outdata就是你想要的东西 excel导入的数据
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1});
          i = 0
          for(var tab in _this.editableTabs) {
            if(_this.editableTabs[tab].name == _this.editableTabsValue) {
              _this.$refs.Tables[i].hotInstance.loadData(outdata)
              break;
            }
            i++
          }
        }
          reader.readAsArrayBuffer(f);
        }
        reader.readAsBinaryString(f);
    },
    addTab(targetName) {
      // 增加表格
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        label: targetName + newTabName,
        name: newTabName,
      });
      this.editableTabsValue = newTabName;
    },
    loadTab() {
      // 给当前表格填入预设数据
      let i = 0
      for(let table in this.editableTabs) {
        if(table == this.editableTabsValue-1){
          this.$refs.Tables[i].hotInstance.loadData([
            [1,'1801',14,'计算机学院','男'],
            [2,'1802',15,'计算机学院','女'],
            [3,'1803',13,'信息学院','女'],
            [4,'1804',16,'外语学院','男'],
            [5,'1805',16,'理学院','男'],
          ])
          break
        }
        i++
      }
    },
    clearTab() {
      // 清空表格数据
      let i = 0
      for(let table in this.editableTabs) {
        if(table == this.editableTabsValue-1){
          this.$refs.Tables[i].hotInstance.loadData(null)
          break
        }
        i++
      }
    },
    removeTab(targetName) {
      // 删除当前表格
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    executeSql() {
      // 执行sql语句
      let _this = this
      let sql = this.editor.getValue().toLowerCase().trim()
      // 创建表格
      for(let tab in this.editableTabs) {
        alasql('create table  if not exists table' + this.editableTabs[tab].name)
      }
      // 给数据库中的表格赋值
      let i = 0
      for(let table in alasql.tables) {
        alasql.tables[table].data = this.$refs.Tables[i++].hotInstance.getData()
      }

      // 执行sql语句
      alasql.promise(sql).then(function (res){
        //成功，弹出抽屉，显示查询结果
        if(res && (sql.split(" ")[0].trim() == "select") ) {
          _this.drawer = true
          _this.$nextTick(() => {
            _this.$refs.Result.hotInstance.loadData(res)
          })
        }
        }).catch(function (err){
          //出错，弹出警告
        _this.$message({
          type: "error",
          dangerouslyUseHTMLString: true,
          offset: 50,
          duration:1000,
          showClose: true,
          message: err
        });
      })
      // 使网页中的表格数量与数据库中的表格数量一致
      i = 0
      for(var table in alasql.tables) {
        if(++i>this.$refs.Tables.length) {
          this.addTab("Table")
        }
      }

      this.$nextTick(() => {
        // 更新网页中的表格
        i = 0
        for (table in alasql.tables) {
          this.$refs.Tables[i++].hotInstance.loadData(alasql.tables[table].data)
        }
        // 删除数据库中的表格
        for (let table in alasql.tables) {
          alasql('drop table ' + table)
        }
      })

    },
    formatSql() {
      // 格式化sql语句
      this.editor.setValue(sqlFormatter.format(this.editor.getValue()))
    },
    compressSql() {
      // 压缩sql语句
      let sql = this.editor.getValue()
      sql = sql.replace(/[\s]/g," ");
      sql = sql.replace(/( )+/g," ");//匹配多余的空格
      this.editor.setValue(sql)
    },
    upperSql() {
      // 转大写
      this.editor.setValue(this.editor.getValue().toUpperCase())
    },
    lowerSql() {
      // 转小写
      this.editor.setValue(this.editor.getValue().toLowerCase())
    },
    cleanSql() {
      // 清空sql语句
      this.editor.setValue("")
    }
  }
}
</script>
<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style scoped>
  .BntDiv{
    text-align:right;
  }
  .textLink {
    display: inline;
    padding-right: 10px;
    padding-left: 20px;

  }
</style>
