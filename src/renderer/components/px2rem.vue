<template>
    <div class="html-work">
        <div class="group">
            <Input placeholder="ratio" v-model="ratio" class="ratio" />
            <Button type="success" @click="handle" class="conversion">转换</Button>
        </div>
        <div class="html2css">
            <div class="split_box" id="html">
                <textarea ref="htmlcode" v-model="pxCon"></textarea>
            </div>
            <div class="split_box" id="css">
                <textarea ref="csscode" v-model="remCon"></textarea>
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
    require("codemirror/addon/display/autorefresh");
    import '../ipc/ipc'
    window.pxEditor = null;
    window.remEditor = null;
    export default {
        data() {
            return {
                pxCon: `.item{
     width: 2rem;
     height: 1.5rem;
     border: 1px solid #ccc;
     margin: 0.1rem auto;
     padding: 0.05rem 0.1rem 0.2rem 0.2rem;
}
`,
                remCon: ` 
 `,
                ratio: 100,
                split: 0.5,
                split2: 0.5,
            }
        },
        methods: {
            handle(){
                
            },
            px2rem() {
                let _this = this
                let pxCon = _this.pxCon;
                let ratio = _this.ratio;
                if (pxCon) {
                    pxCon = $.format(pxCon, {
                        method: "css"
                    }); // 都转换成多行来比较
                    let arr = pxCon.split("\n");
                    let res = '';
                    for (let i = 0; i < arr.length; i++) {
                        let line = arr[i];
                        res += line.replace(/\d+px/g, function (px) {
                            if (true) {
                                if (!/border:/ig.test(line)) {
                                    return (parseInt(px) / parseInt(ratio)) + "rem";
                                } else {
                                    return px;
                                }
                            } else {
                                return (parseInt(px) / parseInt(ratio)) + "rem";
                            }
                        }) + "\n";
                    }
                    let source = _this.pxCon;
                    let sourceArr = source.split("\n");
                    let len = sourceArr.length;
                    if (len > 1) {
                        res = $.format(res, {
                            method: "css"
                        });
                    } else {
                        res = $.format(res, {
                            method: "cssmin"
                        });
                    }
                    _this.remCon = res
                    remEditor.setValue(_this.remCon);
                }
            },
            rem2px() {
                let _this = this
                let remCon = _this.remCon;
                let ratio = _this.ratio || 100;
                if (remCon) {
                    remCon = $.format(remCon, {
                        method: "css"
                    }); // 都转换成多行来比较
                    let arr = remCon.split("\n");
                    let res = '';
                    for (let i = 0; i < arr.length; i++) {
                        let line = arr[i];
                        res += line.replace(/([1-9]\d*.\d*|0.\d*[1-9]\d*|\d*[1-9]\d*)rem/g, function (rem) {
                            console.log(rem);
                            if (!!rem) {
                                if ($("#chkIgnoreBorder").is(":checked")) {
                                    if (!/border:/ig.test(line)) {
                                        return (parseFloat(rem) * parseInt(ratio)) + "px";
                                    } else {
                                        return rem;
                                    }
                                } else {
                                    return (parseFloat(rem) * parseInt(ratio)) + "px";
                                }
                            } else {
                                return rem
                            }
                        }) + "\n";
                    }
                    let source = _this.remCon;
                    let sourceArr = source.split("\n");
                    let len = sourceArr.length;
                    if (len > 1) {
                        res = $.format(res, {
                            method: "css"
                        });
                    } else {
                        res = $.format(res, {
                            method: "cssmin"
                        });
                    }
                    _this.pxCon = res
                    pxEditor.setValue(_this.pxCon);
                }

            },
            initEditor() {
                let _this = this
                pxEditor = CodeMirror.fromTextArea(_this.$refs.htmlcode, {
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

                remEditor = CodeMirror.fromTextArea(_this.$refs.csscode, {
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

                pxEditor.on('changes', function (cm, ins) {
                    cm.save();
                    _this.pxCon = cm.getValue();
                })

                remEditor.on('changes', function (cm, ins) {
                    cm.save();
                    _this.remCon = cm.getValue();
                })


            }

        },
        mounted() {
            this.initEditor();
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
        position: absolute !important;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0
    }

    .split_box {
        display: inline-block;
        width: 50%;
        height: 100%;
        font-size: 14px;
        vertical-align: top;
        background: #fff;
        border-right: 1px solid #fff;
        overflow-y: auto;
    }

    .split_box:last-child {
        border: none;
    }

    .split_box>* {
        vertical-align: top;
        height: 100%;

    }

    .html-view {
        padding-left: 6px;
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


    .group {
        position: absolute;
        z-index: 999;
        width: 100px;
        height: 50px;
        cursor: pointer;
        bottom: 0;
        width: 120px;
        font-size: 0;
    }

    .conversion,
    .ratio {
        width: 50% !important;
        display: inline-block !important;
    }
</style>