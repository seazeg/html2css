<template>

  <!-- <div class="left"><textarea v-model="html"></textarea></div>
    <div class="right">
      <pre v-highlightjs='output'><code class="css"></code></pre>
    </div>
    <p>
      <button @click="go">转换</button>
    </p> -->

  <div class="split_box">
    <Split v-model="split">
      <div slot="left" class="split_pane">
        <!-- <div class="htmlbox"> -->
        <!-- <textarea class="html" v-model="html"></textarea> -->
  <div class="codemirror">
        <codemirror v-model="code" :options="cmOption" class="html" ></codemirror></div>

        <!-- </div> -->
      </div>
      <div slot="right" class="split_pane">
        <pre class="line-numbers"><code class="language-css" v-html="output"></code></pre>
      </div>
    </Split>
    <!-- <p class="btn_box">
      <button @click="go">转换</button>
    </p> -->
  </div>


</template>

<script>
  import Prism from 'prismjs'
  // language
  import 'codemirror/mode/javascript/javascript.js'
  // theme css
  import 'codemirror/theme/monokai.css'
  // require active-line.js
  import 'codemirror/addon/selection/active-line.js'
  // styleSelectedText
  import 'codemirror/addon/selection/mark-selection.js'
  import 'codemirror/addon/search/searchcursor.js'
  // hint
  import 'codemirror/addon/hint/show-hint.js'
  import 'codemirror/addon/hint/show-hint.css'
  import 'codemirror/addon/hint/javascript-hint.js'
  import 'codemirror/addon/selection/active-line.js'
  // highlightSelectionMatches
  import 'codemirror/addon/scroll/annotatescrollbar.js'
  import 'codemirror/addon/search/matchesonscrollbar.js'
  import 'codemirror/addon/search/searchcursor.js'
  import 'codemirror/addon/search/match-highlighter.js'
  // keyMap
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/addon/edit/matchbrackets.js'
  import 'codemirror/addon/comment/comment.js'
  import 'codemirror/addon/dialog/dialog.js'
  import 'codemirror/addon/dialog/dialog.css'
  import 'codemirror/addon/search/searchcursor.js'
  import 'codemirror/addon/search/search.js'
  import 'codemirror/keymap/sublime.js'
  // foldGutter
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/brace-fold.js'
  import 'codemirror/addon/fold/comment-fold.js'
  import 'codemirror/addon/fold/foldcode.js'
  import 'codemirror/addon/fold/foldgutter.js'
  import 'codemirror/addon/fold/indent-fold.js'
  import 'codemirror/addon/fold/markdown-fold.js'
  import 'codemirror/addon/fold/xml-fold.js'
  export default {
    data() {
      return {
        code: `import someResource from 'codemirror/some-resource'
export default {
  data () {
    // 这是一个包含、代码提示、折叠、选中、sublime模式...的编辑器
    // 按下Ctrl键可以体验代码提示
    // 可以尝试sublime下的快捷键操作
    return {
      exampleCode: 'const a = 10',
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        lineWrapping: true,
        theme: 'default'
      }
    }
  },
  components: examples
}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta spm-a='AAAA' point1='1280' point2='750'>
    <title>Document</title>
</head>
<body spm-b='BBB'>
    <div class='js_new' spm-c='new_list'>

    </div>
</body>
</html>`,
        output: ``,
        cssArr: [],
        split: 0.5,
        cmOption: {
          tabSize: 4,
          styleActiveLine: false,
          lineNumbers: true,
          styleSelectedText: false,
          line: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          highlightSelectionMatches: {
            showToken: /\w/,
            annotateScrollbar: true
          },
          mode: 'text/javascript',
          // hint.js options
          hintOptions: {
            // 当匹配只有一项的时候是否自动补全
            completeSingle: true
          },
          //快捷键 可提供三种模式 sublime、emacs、vim
          // keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          extraKeys: {
            "Ctrl": "autocomplete"
          }
        }
      };
    },
    methods: {
      go() {
        let dom = this.$(this.html);
        let temp = this.eachDom(dom, {});
        this.cssArr = [];
        this.toCss(temp);
        this.output = this.egUtils.arrUnique(this.cssArr).join('\n');
        Prism.highlightAll()
      },
      toCss(data) {
        let _this = this;
        for (let i in data) {
          if (data[i]) {
            // debugger
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
              temp.result = `.${temp.className}`
            }
            children = this.eachDom(dom.eq(i).children(), temp);
            if (children.length > 0) {
              temp.children = children
            }
            tree.push(temp);
          }
        }
        return tree;
      }
    },
    mounted() {
      setTimeout(() => {
        this.styleSelectedText = true,
          this.cmOption.styleActiveLine = true
      }, 100)
    },
    created() {
      // this.go();

    },
    updated() {

      // this.go();
    }
  };
</script>

<style> 
  /* body {
    margin: 0;
    padding: 0;
  }

 

  .htmlbox {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0;
    margin: 0 !important;
    font-size: 12px !important;
    vertical-align: top;
    border: none;
    overflow-y: auto;
  }

  .html {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
  
    line-height: 24px;
    font-size: 14px;
    letter-spacing: 1px;
    outline: none;
    position: absolute;
    top: 0
  }


  .split_box {
    height: 800px
   
  }

  .split_pane {
    height: 100%;
  }

 
  .CodeMirror {
    height: 100% !important;
  } */
</style>