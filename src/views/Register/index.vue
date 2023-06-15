<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'

// 表单的校验
const form = ref({
    username: '',
    password: '',
    agree: true
})

const rules = {
    username: [
        { required: true, message: '账号不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码为6-14个字符', trigger: 'blur' }
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                if (value) {
                    callback()
                } else {
                    callback(new Error("请勾选协议"))
                }
            }
        }
    ]
}
// 表单的统一校验
const userStore = useUserStore()
const router = useRouter()
const formRef = ref(null)
const doRegister = () => {
    const { username, password } = form.value
    formRef.value.validate(async (valid) => {
        if (valid) {
            await userStore.getRegisterUserState({ username, password })
            ElMessage({ type: 'success', message: '登录成功' })
            router.replace('/')
        }
    })
}

</script>


<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">小兔鲜</RouterLink>
                </h1>
                <RouterLink style="background-color: #fff" class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;" style="background-color: #fff;">账户注册</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form label-position="right" label-width="60px" :model="form" :rules="rules" ref="formRef"
                            status-icon>
                            <el-form-item prop="username" label="账户">
                                <el-input v-model="form.username" />
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" />
                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox v-model="form.agree" size="large">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>
                            <el-button size="large" class="subBtn" @click="doRegister">点击注册</el-button>
                        </el-form>
                        <div>
                            <RouterLink class="btn-login" to="/login">进入登录页面</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang='scss'>
.btn-login {
    width: 100px;
    display: flex;
    margin: 0 auto;

    &:hover {
        background-color: #fff;
    }
}

.container {
    width: 1240px;
    margin: 0 auto;
    position: relative;
}

.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: gold;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    min-height: 500px;
    background: url('@/assets/images/login-bg.png') no-repeat center / cover;
    height: 75vh;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 128px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: gold;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: gold;
                    }

                    &.active,
                    &:focus {
                        border-color: gold;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: gold;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: gold;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: gold;
    width: 100%;
    color: #fff;
}
</style>