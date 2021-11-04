<script>
  import {tries, correctAnswers} from "./store";
  let knowledge = "N/A";
  let percentile = "N/A";
  let correcResponses;

  correctAnswers.subscribe(value => {
    correcResponses = value;
  });

  $: {
    if ($tries > 0) {
      percentile = Math.round(correcResponses / $tries * 100);
      if (percentile < 25) {
        knowledge = "poor";
      } else if (percentile < 50) {
        knowledge = "knowledgeable";
      } else if (percentile < 75) {
        knowledge = "smart";
      } else {
        knowledge = "genius";
      }
    }
  }
</script>

<h4>Knowledge</h4>
<p>Percentile: {percentile}%</p>
<p>Rank: Poke {knowledge}</p>
