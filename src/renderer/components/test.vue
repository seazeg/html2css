<template>
    <div>
        <div class="html-work">
            <div class="html2css">
                <div class="box">
                    <textarea ref="mycode" v-model="html"></textarea>
                </div>
                <div class="box">
                    <pre class="line-numbers"><code class="language-css" v-html="output"></code></pre>
                </div>
            </div>

        </div>
        <!-- <div class="html-view" v-html="html"></div> -->
    </div>
</template>

<script>
    import Prism from 'prismjs'
    import "codemirror/theme/cobalt.css";
    import "codemirror/lib/codemirror.css";
    import "codemirror/addon/hint/show-hint.css";

    let CodeMirror = require("codemirror/lib/codemirror");
    require("codemirror/addon/edit/matchbrackets");
    require("codemirror/addon/selection/active-line");
    require("codemirror/mode/xml/xml");
    require("codemirror/mode/css/css");
    require("codemirror/addon/hint/show-hint");
    require("codemirror/addon/hint/html-hint");
    require("codemirror/addon/edit/closetag");

    window.editor = null;
    export default {
        data() {
            return {
                html: `<div class="demo-box">
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>`,
                output: ``,
                cssArr: [],
                split: 0.5,
            }
        },
        methods: {
            transform() {
                try {
                    let dom = this.html.split('')[0] == '<' ? this.$(this.html) : '';
                    this.cssArr = [];
                    this.toCss(this.eachDom(dom, {}));
                    this.output = this.egUtils.arrUnique(this.cssArr).join('\n');
                    this.$nextTick(function () {
                        Prism.highlightAll()
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
                editor = CodeMirror.fromTextArea(this.$refs.mycode, {
                    mode: 'text/html',
                    indentWithTabs: true,
                    smartIndent: false,
                    matchBrackets: true,
                    theme: 'cobalt',
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

                editor.on('changes', function () {
                    editor.save();
                    _this.html = editor.getTextArea().value
                    _this.transform();

                })
            },
        },
        mounted() {
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

    .html-work{
        /* position: relative; */
        /* height:300px; */
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
        width: 50%;
        height: 100%;
        font-size: 14px
    }

    .html2css .box>* {
        vertical-align: top;
        height: 100%;

    }


    .html-view {
        position: relative;
        height: 1000px;
        width: 100%;

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