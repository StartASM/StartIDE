<script lang="ts">
  import HeaderBar from './components/HeaderBar.svelte';
  import MonacoEditor from './components/EditorWindow.svelte';
  let sampleCode =
          "comment \"Pointer code is to test some basic pointer operations in StartASM\"\n" +
          "\n" +
          "comment \"First let's get the input string by looping until ~ is detected\"\n" +
          "comment \"First create three memory addresses - our start index, our current index and our increment amount\"\n" +
          "create memory m<0> to r0\n" +
          "create memory m<0> to r1\n" +
          "create memory m<1> to r2\n" +
          "comment \"Next create our terminating character\"\n" +
          "create character ~ to r3\n" +
          "\n" +
          "comment \"Prompt the user for input\"\n" +
          "print \"Enter your string until you terminate with the ~ key\"\n" +
          "print newline\n" +
          "\n" +
          "comment \"Loop the input until we detect the ~ key\"\n" +
          "label 'inputLoop'\n" +
          "input character to r4\n" +
          "compare r4 with r3\n" +
          "jump if equal to 'outputLoop'\n" +
          "store r4 to r1\n" +
          "add r1 with r2 to r1\n" +
          "jump if unconditional to 'inputLoop'\n" +
          "\n" +
          "comment \"Now let's print the string back to them starting from our start index until it hit's our 'current' (or end) index\"\n" +
          "label 'outputLoop'\n" +
          "load r0 to r4\n" +
          "output r4\n" +
          "add r0 with r2 to r0\n" +
          "compare r0 with r1\n" +
          "jump if greater to 'terminateProgram'\n" +
          "jump if unconditional to 'outputLoop'\n" +
          "\n" +
          "label 'terminateProgram'\n" +
          "stop"
</script>

<div class="flex flex-col h-screen">
  <div class="flex flex-col flex-grow p-4">
    <HeaderBar fileName="main.sasm" />
    <MonacoEditor initialValue={sampleCode} />
  </div>
</div>
