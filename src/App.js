import EngagementMessagesOverTime from "./EngagementMessageOverTime";
import messageCountList from "./utils/messageCountList.json";
import channels from "./utils/channels.json";

function App() {
  return (
    <EngagementMessagesOverTime
      messageCountList={messageCountList}
      channels={channels}
    />
  );
}

export default App;
