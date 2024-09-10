const div = document.getElementById("root");

// create async generator function
async function* streamGenerator() {
  
  const decoder = new TextDecoder();
  const response = await fetch("/stream");
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    yield decoder.decode(value);
  }
}

const run = async () => {
  for await (const chunk of streamGenerator()) {
    div.innerText += chunk;
  }
}

run();