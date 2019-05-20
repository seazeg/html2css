<template>
    <div>
        <div class="html-work">
            <div class="html2css">
                <div class="box">
                    <textarea ref="htmlcode" v-model="html"></textarea>
                </div>
                <div class="box">
                    <textarea ref="csscode" v-model="output"></textarea>
                </div>
                <div class="box">
                    <div ref="view" class="html-view"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import "codemirror/theme/cobalt.css";
    import "codemirror/theme/yonce.css"
    import "codemirror/theme/midnight.css"
    import "codemirror/theme/mdn-like.css"
    import "codemirror/theme/lucario.css"
    import "codemirror/addon/dialog/dialog.css"


    import "codemirror/lib/codemirror.css";
    import "codemirror/addon/hint/show-hint.css";

    let CodeMirror = require("codemirror/lib/codemirror");
    require("codemirror/addon/edit/matchbrackets");
    require("codemirror/addon/selection/active-line");
    require("codemirror/mode/xml/xml");
    require("codemirror/mode/css/css");
    require("codemirror/addon/hint/show-hint");
    require("codemirror/addon/hint/html-hint");
    require("codemirror/addon/hint/css-hint");
    require("codemirror/addon/edit/closetag");
    require("codemirror/addon/search/search");
    require("codemirror/addon/search/searchcursor");
    require("codemirror/addon/search/jump-to-line");
    require("codemirror/addon/dialog/dialog");


    window.htmlEditor = null;
    window.cssEditor = null;
    window.shadow = null;
    export default {
        data() {
            return {
                html: `
<!-- 底部start -->
<div class="foot_topbox sd_module">
    <div class="main_con">
        <div class="o_g foot_linkbox">
            <div class="sd_nav">
                <div class="o_u o_xs_2-2 foot_linkitem">
                    <div class="foot_linkitem_title">
                        <div>
                            <a href="javascript:;">Household</a>
                        </div>
                        <div class="o_df-hide o_xs-show foot_linkitem_iconbox js_foot_linkitem_iconbox">
                            <i class="js_foot_linkitem_hide">+</i>
                            <i class="js_foot_linkitem_show none">-</i>
                        </div>
                    </div>
                    <ul class="foot_linkitem_conbox js_foot_linkitem_conbox">
                        <li>
                            <a href="javascript:;">Refrigerator</a>
                        </li>
                        <li>
                            <a href="javascript:;">Freezer</a>
                        </li>
                        <li>
                            <a href="javascript:;">Washer & Dryer</a>
                        </li>
                        <li>
                            <a href="javascript:;">Air Conditioner</a>
                        </li>
                        <li>
                            <a href="javascript:;">TV</a>
                        </li>
                        <li>
                            <a href="javascript:;">Cooker</a>
                        </li>
                    </ul>
                </div>
                <div class="o_u o_xs_2-2 foot_linkitem">
                    <div class="foot_linkitem_title">
                        <div>
                            <a href="javascript:;">Business</a>
                        </div>
                        <div class="o_df-hide o_xs-show foot_linkitem_iconbox js_foot_linkitem_iconbox">
                            <i class="js_foot_linkitem_hide">+</i>
                            <i class="js_foot_linkitem_show none">-</i>
                        </div>
                    </div>
                    <ul class="foot_linkitem_conbox js_foot_linkitem_conbox">
                        <li>
                            <a href="javascript:;">Commercial Air Conditioner</a>
                        </li>
                        <li>
                            <a href="javascript:;">Bio Medical</a>
                        </li>
                    </ul>
                </div>
                <div class="o_u o_xs_2-2 foot_linkitem">
                    <div class="foot_linkitem_title">
                        <div>
                            <a href="javascript:;">Service & Support</a>
                        </div>
                        <div class="o_df-hide o_xs-show foot_linkitem_iconbox js_foot_linkitem_iconbox">
                            <i class="js_foot_linkitem_hide">+</i>
                            <i class="js_foot_linkitem_show none">-</i>
                        </div>
                    </div>
                    <ul class="foot_linkitem_conbox js_foot_linkitem_conbox">
                        <li>
                            <a href="javascript:;">Product Registration</a>
                        </li>
                        <li>
                            <a href="javascript:;">Service Appointment</a>
                        </li>
                        <li>
                            <a href="javascript:;">Status Tracking</a>
                        </li>
                        <li>
                            <a href="javascript:;">Spare Parts and Accessories</a>
                        </li>
                        <li>
                            <a href="javascript:;">Purchase of Warranty Service</a>
                        </li>
                        <li>
                            <a href="javascript:;">Demo videos</a>
                        </li>
                        <li>
                            <a href="javascript:;">FAQ</a>
                        </li>
                        <li>
                            <a href="javascript:;">Manual  Download</a>
                        </li>
                        <li>
                            <a href="javascript:;">Warranty Policy</a>
                        </li>
                        <li>
                            <a href="javascript:;">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div class="o_u o_xs_2-2 foot_linkitem">
                    <div class="foot_linkitem_title">
                        <div>
                            <a href="javascript:;">Where To Buy</a>
                        </div>
                        <div class="o_df-hide o_xs-show foot_linkitem_iconbox js_foot_linkitem_iconbox">
                            <i class="js_foot_linkitem_hide">+</i>
                            <i class="js_foot_linkitem_show none">-</i>
                        </div>
                    </div>
                    <ul class="foot_linkitem_conbox js_foot_linkitem_conbox">
                        <li>
                            <a href="javascript:;">Online Stores</a>
                        </li>
                        <li>
                            <a href="javascript:;">Dealers</a>
                        </li>
                    </ul>
                </div>
                <div class="o_u o_xs_2-2 foot_linkitem">
                    <div class="foot_linkitem_title">
                        <div>
                            <a href="javascript:;">About Haier</a>
                        </div>
                        <div class="o_df-hide o_xs-show foot_linkitem_iconbox js_foot_linkitem_iconbox">
                            <i class="js_foot_linkitem_hide">+</i>
                            <i class="js_foot_linkitem_show none">-</i>
                        </div>
                    </div>
                    <ul class="foot_linkitem_conbox js_foot_linkitem_conbox">
                        <li>
                            <a href="javascript:;">Haier Group Profile</a>
                        </li>
                        <li>
                            <a href="javascript:;">The Haier Brand</a>
                        </li>
                        <li>
                            <a href="javascript:;">Haier  UK</a>
                        </li>
                        <li>
                            <a href="javascript:;">Investor Relations</a>
                        </li>
                        <li>
                            <a href="javascript:;">News</a>
                        </li>
                        <li>
                            <a href="javascript:;">Important Notice</a>
                        </li>
                        <li>
                            <a href="javascript:;">Media Center</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="foot_sharebox">
            <a href="javascript:;" class="foot_logo o_xs-hide">
                <img src="../images/hw2019_head_logo.png" alt="">
            </a>
            <p>
                <a href="javascript:;">
                    <img src="../images/hw2019_foot_flag.png" alt="">
                    <span>Global / English</span>
                    <i class="iconfont icon_right"></i>
                </a>
            </p>
            <div class="foot_share">
                <a href="javascript:;">
                    <i class="fb_icon"></i>
                </a>
                <a href="javascript:;">
                    <i class="twitter_icon"></i>
                </a>
                <a href="javascript:;">
                    <i class="ins_icon"></i>
                </a>
            </div>
        </div>
    </div>
</div>
<div class="foot_bottombox sd_module">
    <div class="main_con o_g clearfloat">
        <div class="foot_door sd_nav">
            <a href="javascript:;">Haier Group</a>
            <a href="javascript:;">Contact Us</a>
            <a href="javascript:;">Job Opportunities</a>
            <a href="javascript:;">Legal</a>
        </div>
        <div class="o_u o_xs_2-2 foot_copy right">
            <span>Copyright ©2016 Haier Inc.All rights reserved</span>
        </div>
    </div>
</div>
<!-- 底部end -->`,
                output: ``,
                cssArr: [],
                split: 0.5,
                preview: ``
            }
        },
        methods: {
            transform() {
                let _this = this
                try {
                    let dom = _this.egUtils.trim(_this.html, 'side').split('')[0] == '<' ? _this.$(_this.html) : '';
                    _this.cssArr = [];
                    console.log(dom);
                    if (!_this.egUtils.isEmpty(dom)) {
                        for (let i = 0; i < dom.length; i++) {
                            if (dom.eq(i).get(0).tagName == 'DIV') {
                                _this.toCss(_this.eachDom(dom.eq(i), {}));
                                _this.output = _this.egUtils.arrUnique(_this.cssArr).join('\n');

                            }
                        }
                    } else {
                        _this.output = ``
                    }
                    _this.$nextTick(function () {
                        cssEditor.setValue(_this.output);
                        shadow.innerHTML = _this.preview
                    })

                } catch (error) {
                    console.warn('标签输入不完整');
                }
            },
            toCss(data) {
                let _this = this;
                for (let i in data) {
                    if (data[i]) {
                        _this.cssArr.push(`${data[i].result}{\n\n}`)
                        _this.toCss(data[i].children);
                    }
                }
            },
            eachDom: function (dom, obj) {
                let tree = [],
                    children;
                for (let i = 0; i < dom.length; i++) {
                    if (dom.length > 0) {
                        let temp = {}
                        temp = {
                            tagName: dom.eq(i).get(0).tagName,
                            className: dom[i].classList[0],
                            index: i,
                            result: ""
                        }
                        if (obj.result) {
                            if (temp.className) {
                                temp.result = `${obj.result} .${temp.className}`
                            } else {
                                temp.result = `${obj.result} ${temp.tagName.toLocaleLowerCase()}`
                            }
                        } else {
                            temp.result = !temp.className ? `${temp.tagName.toLocaleLowerCase()}` :
                                `.${temp.className}`
                        }
                        children = this.eachDom(dom.eq(i).children(), temp);
                        if (children.length > 0) {
                            temp.children = children
                        }
                        tree.push(temp);
                    }
                }
                return tree;
            },
            initEditor() {
                let _this = this
                htmlEditor = CodeMirror.fromTextArea(this.$refs.htmlcode, {
                    mode: 'text/html',
                    indentWithTabs: true,
                    smartIndent: false,
                    matchBrackets: true,
                    theme: 'lucario',
                    styleActiveLine: true,
                    lineNumbers: true,
                    styleSelectedText: false,
                    autoCloseTags: true,
                    line: true,
                    extraKeys: {
                        'Ctrl': 'autocomplete'
                    },
                    hintOptions: {
                        completeSingle: false
                    }
                })

                cssEditor = CodeMirror.fromTextArea(this.$refs.csscode, {
                    mode: 'text/css',
                    indentWithTabs: true,
                    smartIndent: false,
                    matchBrackets: true,
                    theme: 'lucario',
                    styleActiveLine: true,
                    lineNumbers: true,
                    styleSelectedText: false,
                    autoCloseTags: true,
                    line: true,
                    extraKeys: {
                        'Ctrl': 'autocomplete'
                    },
                    hintOptions: {
                        completeSingle: false
                    }
                })

                htmlEditor.on('changes', function () {
                    htmlEditor.save();
                    _this.html = htmlEditor.getTextArea().value;
                    _this.transform();
                })

                cssEditor.on('changes', function () {
                    cssEditor.save();
                    _this.output = cssEditor.getTextArea().value;
                    _this.preview = _this.html + `<style>${_this.output}</style>`;
                    shadow.innerHTML = _this.preview
                })
            },
            shadowDOM() {
                shadow = this.$refs.view.createShadowRoot();
            }
        },
        mounted() {
            this.shadowDOM()
            this.initEditor();
            this.transform();
        }
    }
</script>
<style>
    body {
        margin: 0;
        padding: 0;

    }

    .html2css {
        height: 100%;
        font-size: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0
    }

    .html2css .box {
        display: inline-block;
        width: 33.3%;
        height: 100%;
        font-size: 14px;
        vertical-align: top;
        background: #fff;
        border-right: 1px solid #fff;
    }

    .html2css .box>* {
        vertical-align: top;
        height: 100%;

    }

    pre {
        width: 100%;
        height: 100%;
        position: absolute;
        padding: 0;
        margin: 0 !important;
        font-size: 14px !important;
        vertical-align: top;
        border: none;
        overflow-y: auto;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace !important
    }
</style>