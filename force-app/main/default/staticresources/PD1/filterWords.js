function filterWords(elementId) {
    const descText = document.getElementById(elementId).value;
    const descArray = descText.split(" ");
    const words = ['maybe', 'should', 'think', 'like', 'very'];
    const filteredArray = descArray.filter(value => words.includes(value));
    if (filteredArray.length == 0)
        alert('Congratulations, no weak or overused words found')
    else
        alert('Consider editing your text content. Found the following weak or overused words: ' + JSON.stringify(filteredArray));
    
}