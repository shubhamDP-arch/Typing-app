class Display {
  constructor(commonwords) {
    this.commonwords = commonwords;
    this.letters = [];
    this.randomWordsArray = [];
    this.numberofwords = 50; 
    this.num = 0;
    this.highlightIndex =0;
    this.displaytheseword = [];
  }
  selectRandomWords() {
    for (let i = 0; i < this.numberofwords; i++) {
      let randomNumber = Math.floor(Math.random() * this.commonwords.length);
      this.randomWordsArray.push(this.commonwords[randomNumber]);
    }
  }

  convertWordsToLetters() {
    this.randomWordsArray.forEach((word) => {
      let wordWithSpace = word + " "; 
      this.letters.push(wordWithSpace.split(""));
    });
  }
  ElementstoBedisplayed(){
  }

  displayWords() {
    const container = document.getElementById('word-container');
    container.innerHTML = '';
    this.letters.forEach((wordArray) => {
      const wordElement = document.createElement("span")
      wordElement.setAttribute('id', `word-${this.highlightIndex}`)
      
      this.highlightIndex++;
      wordArray.forEach((letter) => {
        const letterElement = document.createElement('span'); 
        letterElement.setAttribute('id', this.num)
        this.num++
        letterElement.textContent = letter;
        wordElement.appendChild(letterElement);
        
      });
    container.appendChild(wordElement)});
  }
}

class Game extends Display {
  constructor(commonwords) {
    super(commonwords);
    this.wordIndex = 0; // indexing for each word
    this.letterIndex = 0;// indexing for each letter 
    this.colorIndex = 0;//indexing for each color
    this.currentWord = "";
    this.boolLetter = [];
    this.boolWord = [];
    this.setupGame();
  }

  setupGame() {
    this.selectRandomWords();
    this.convertWordsToLetters();
    this.currentWord = this.letters[this.wordIndex]
    this.displayWords();
  }
 //this press method is bullshit never touch again please
  press(event) {
    
    let pressedKey = event.key;
    let currentLetter = " "
    try {
      this.currentWord = this.letters[this.wordIndex]
      currentLetter = this.currentWord[this.letterIndex]
    } catch (error) {
      this.wordIndex = 0
    }
    
    
    
    let highlightword = document.getElementById(`word-${this.wordIndex}`)
    highlightword.style.textDecoration = 'underline'
    
    if(pressedKey == currentLetter){
      let index = document.getElementById(this.colorIndex);
      this.colorIndex++;

      index.style.color = 'green' ;
      this.boolLetter.push(true)
      this.letterIndex++;
      if(currentLetter == " "){
        highlightword.style.textDecoration = null
        this.checkwordcorrect()
        this.wordIndex++;
        this.letterIndex = 0
        
      }
    }
    else if(pressedKey == "Backspace"){

      
      this.letterIndex--;
      this.colorIndex--;
      this.boolLetter.pop()
      try {
        let index = document.getElementById(this.colorIndex);
        index.style.color = 'black'
        index.style.backgroundColor = 'white'
      } catch (error) {
        this.colorIndex = 0
      }
      
      
      if(this.letterIndex<0){
        
        highlightword.style.textDecoration = null
        this.boolWord.pop()
        try {
          this.letterIndex = this.letters[this.wordIndex-1].length - 1
          this.wordIndex--;
        } catch (error) {
          this.letterIndex = 0
          this.wordIndex = 0
        }
        
        
        if(this.letterIndex<0){
          this.letterIndex = 0;
          this.colorIndex = 0;
        }
        
      }
    }
    
    else if(pressedKey !== currentLetter){
      let index = document.getElementById(this.colorIndex)
      this.colorIndex++;
      index.style.color = 'red' 
      this.letterIndex++;
      this.boolLetter.push(false)
      
      if(currentLetter == " "){
        index.style.backgroundColor = 'red'
        highlightword.style.textDecoration = null
        this.wordIndex++;
        this.letterIndex = 0
        this.checkwordcorrect()
      }
    }

    console.log(this.wordIndex)
    console.log(this.numberofwords)
    if(this.wordIndex == this.numberofwords){
      this.game_end()
    }

  }
  checkwordcorrect(){
    
    let i = true
    this.boolLetter.forEach((bool)=>{
    if(i){
      if(!bool){
        this.boolWord.push(false)
        this.boolLetter =[]
        i= false
        return;
      }
    }
    }
    )
    if(i){
    this.boolWord.push(true)
    this.boolLetter = []
    }
  }
  game_end(){
    let game_end = true
    let cw = 0;
    let iw = 0;
    this.boolWord.forEach((bool) => {
      if(bool){
        cw++;
      }
      else if(!bool){
        iw++;
      }
    })
    let result = new Result(game_end, cw, iw, this.wordIndex, this.letterIndex)

    
  }
}

class Time{
  constructor(running){
    this.running = running;
    this.timeRemaining = 60
  }
  startTimer(){
    this.time = setInterval(() => this.updateTimer(), 1000);
    this.running = true;
  }
  stopTimer(){
    clearInterval(this.time);
    this.running = false;
  }
  resetTimer(){
    this.stopTimer();
    this.timeRemaining = 60;
  }
  updateTimer() {
    if (this.timeRemaining > 0) {
      this.timeRemaining--;
      let timeContainer = document.getElementById('time-container')
      timeContainer.innerHTML = "time remaining:" + this.timeRemaining
            
    } else {
      this.stopTimer();
      
    }
}

}

class Result extends Time{
  constructor(gameEnd, correctWords, incorrectWords, numberofwords, numberofletters){
    this.gameEnd = gameEnd
    this.correctWords = correctWords
    this.incorrectWords = incorrectWords
    this.numberofwords = numberofwords
    this.numberofwords = numberofletters
    this.grosswpm = 0;
    this.accuracyProperty = 0;
    
  }

  wpm(){
    let timespent = (60 - this.timeRemaining)/60
    if(timespent == 0){
      timespent = 60
    }
    
    this.grosswpm = (numberofletters/5)/(timespent)
    
  }
  accuracy(){
    this.accuracyProperty =   (this.correctWords/this.numberofwords)*100
  }
  characters(){ 
    
  }
  time(){

  }


}


const commonWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

document.addEventListener('DOMContentLoaded', () => {
  
  let game = new Game(commonWords);
  let running = true
  let timer = new Time(running);
  document.addEventListener("keydown", (event)=>{
    if(running){
      timer.startTimer();
      running=false
    }
    game.press(event);
    
  })
  
});


