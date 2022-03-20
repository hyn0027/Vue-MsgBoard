<template>
  <div id="message-board">
    <el-container style="height:100%; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 10px">
        <el-button style="display: inline-block;margin-right: 15px;" v-on:click="postDialog.dialogVisible=true">
          <i class="el-icon-edit">发表</i>
        </el-button>
        <!--请修改这两行注释中间的代码完成"刷新"功能-->
        <el-button style="display: inline-block;margin-right: 15px;">
        <!--请修改这两行注释中间的代码完成"刷新"功能-->
          <i class="el-icon-refresh" v-on:click="getAjax()" style="object-fit: fill">刷新</i>
        </el-button>
        <el-dropdown trigger="click">
          <el-button><i class="el-icon-user" style="object-fit: contain">
            <span v-if="state.username_valid">{{state.username}}</span>
            <span v-else>匿名</span></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="state.username_valid">
              <a v-on:click="clearUserName()">注销</a>
            </el-dropdown-item>
            <el-dropdown-item v-if="state.username_valid">
              <a v-on:click="loginDialog.dialogVisible=true">修改</a>
            </el-dropdown-item>
            <el-dropdown-item v-if="!state.username_valid">
              <a v-on:click="loginDialog.dialogVisible=true">设置</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <!--请补全这两行注释中间的messagelist done -->
        <MessageList :messageList = "this.messageList"/>
        <!--请补全这两行注释中间的messagelist done -->
      </el-main>

      <el-footer>@CST2021SE</el-footer>
    </el-container>
    <!--请补全这两行注释中间的PostDialog done -->
    <template v-if="postDialog.dialogVisible"  >
      <PostDialog :dialogVisible = "true" :state = "state" @changePostDialogData="changePost"/>
    </template>
    <!--请补全这两行注释中间的PostDialog done -->
    <!--请补全这两行注释中间的LoginDialog done -->
    <template v-if="loginDialog.dialogVisible">
      <LoginDialog :loginDialog = "loginDialog" :state = "state" :updateUsername = "setUserName"/>
    </template>
    <!--请补全这两行注释中间的LoginDialog done-->
    <el-dialog
            style="text-align: center"
            :title="alertDialog.text"
            :visible.sync="alertDialog.dialogVisible"
            width="40%">
    </el-dialog>
  </div>
</template>

<script>
import MessageList from "@/components/MessageList"
import PostDialog from "@/components/PostDialog"
import LoginDialog from "./LoginDialog";
import CookieOperation from "@/utils/tools.js"
export default {
	name: "MessageBoard",
	components: {
    LoginDialog,
		MessageList,
		PostDialog
	},
	// 请在下方设计自己的数据结构及函数来完成最终的留言板功能
	data(){
		return {
			postDialog:{
				dialogVisible:false
			},
      loginDialog:{
        dialogVisible:false,
        dialogError:"",
        form:{
          username:""
        }
      },
			alertDialog:{
				"text":"",
				dialogVisible:false
			},
			state:{
				username:  "",
				username_valid:false
			},
			messageList: []
		}
	},
	mounted() {
		this.getAjax();
	},
	methods:{
    set_username :function() {
      var str = CookieOperation.getCookie("name", null)
      if (str)
        this.setUserName(str)
    },
    get_function :function(data) {
      this.messageList = []
			for (let i in data) {
        if (data[i].timestamp > 1e11) 
          data[i].timestamp /= 1000
        data[i].user = unescape(data[i].user)
				this.messageList.push({
					title: data[i].title,
					message: data[i].content,
					user: data[i].user,
					timestamp: data[i].timestamp
				})
			}
      this.$message("updated")
      // this.alertDialog.text = "已刷新留言"
      // this.alertDialog.dialogVisible = true;
    },
		getAjax :function () {
      this.set_username();
      this.$axios.request_json(this.get_function)
		},
    changePost(title, messages) {
      this.postDialog.dialogVisible = false;
      if (title == null){
        return;
      }
      this.$axios.send_json(title, messages ).then((str) => {
        this.getAjax()
        this.alertDialog.text=str;
        this.alertDialog.dialogVisible = true;
        // this.$message(str)
      })
    },
    async clearUserName() {
      //补全代码时可以使用utils/tool。js的代码
      await CookieOperation.setCookie("name", this.state.username, new Date().getTime() - 1e9)
      await CookieOperation.setCookie("user", this.state.username, new Date().getTime() - 1e9)
      await CookieOperation.setCookie("username", this.state.username, new Date().getTime() - 1e9)
      this.state.username = ""
      this.state.username_valid = false
    },
    async setUserName(name) {
      this.state.username = name
      this.state.username_valid = true
      await CookieOperation.setCookie("name", name, new Date().getTime() + 1e9)
      await CookieOperation.setCookie("user", name, new Date().getTime() + 1e9)
      await CookieOperation.setCookie("username", name, new Date().getTime() + 1e9)
      this.loginDialog.dialogVisible = false
      this.loginDialog.form.username = ""
    }
	},
  watch: { // 用于实时检测username是否合法
    "state.username": {
      handler(newName) {
        this.state.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
      }
    }
  }
}
</script>

<style scoped>
    #message-board{
        height: calc(100vh - 16px);
    }
    .message-tab{
        display: block;
        padding: 10px;
        text-align: left;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .el-footer {
        background-color: #7197c9;
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
    }
</style>
