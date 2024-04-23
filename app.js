// Kartların adlarını ve görüntülerini içeren bir dizi oluşturur
const cardArray = 
[
    {name: 'fries', img: 'images/fries.jpg'},
    {name: 'cheeseburger', img: 'images/cheeseburger.jpg'},
    {name: 'hotdog', img: 'images/hotdog.jpg'},
    {name: 'icecream', img: 'images/icecream.jpg'},
    {name: 'milkshake', img: 'images/milkshake.jpg'},
    {name: 'pizza', img: 'images/pizza.jpg'},
    {name: 'fries', img: 'images/fries.jpg'},
    {name: 'cheeseburger', img: 'images/cheeseburger.jpg'},
    {name: 'hotdog', img: 'images/hotdog.jpg'},
    {name: 'icecream', img: 'images/icecream.jpg'},
    {name: 'milkshake', img: 'images/milkshake.jpg'},
    {name: 'pizza', img: 'images/pizza.jpg'},    
]

// Kartları rastgele karıştırır
cardArray.sort(() => 0.5 - Math.random())

// Oyun tahtasını temsil eden bir HTML öğesini seçer
const gridDisplay = document.querySelector('#grid')

// Skoru tutmak için bir değişken oluşturur
let score = document.getElementById('score')

// Seçilen kartların adlarını ve kimliklerini saklamak için boş diziler oluşturur
let cardChosen = []
let cardChosenID = []

// Eşleşen kartları saklamak için bir dizi oluşturur
const cardWon = []

// Oyun tahtasını oluşturan fonksiyon
function createBoard()
{
    for(let i=0;i<cardArray.length;i++)
    {
        // Her bir kart için bir img öğesi oluşturur
        const card = document.createElement('img')
        
        // Başlangıçta kartın görüntüsünü kapalı (blank.jpg) olarak ayarlar
        card.setAttribute('src' , 'images/blank.jpg')
        
        // Kartın kimliğini belirler
        card.setAttribute('data-id' , i)
        
        // Kartın tıklanma olayını dinler
        card.addEventListener('click', flipCard)
        
        // Oluşturulan kartı oyun tahtasına ekler
        gridDisplay.appendChild(card)
    }
}

// Oyun tahtasını oluşturur
createBoard()

// Eşleşen kartları kontrol eden fonksiyon
function checkMatch()
{
    // Tüm kartları seçer
    const cards = document.querySelectorAll('#grid img')

    // İlk ve ikinci seçilen kartların kimliklerini alır
    const optionOneID = cardChosenID[0]
    const optionTwoID = cardChosenID[1]

    // Eğer seçilen kartlar eşleşiyorsa
    if(cardChosen[0] === cardChosen[1])
    {
        // Kartların görüntüsünü beyaz (white.png) olarak değiştirir
        cards[optionOneID].setAttribute('src', 'images/white.png')
        cards[optionTwoID].setAttribute('src', 'images/white.png')
        
        // Kartların tıklanma olaylarını kaldırır
        cards[optionOneID].removeEventListener('click', flipCard)
        cards[optionTwoID].removeEventListener('click', flipCard)
        
        // Eşleşen kartları cardWon dizisine ekler
        cardWon.push(cardChosen)
    }
    else // Eğer seçilen kartlar eşleşmiyorsa
    {
        // Kartların görüntüsünü kapalı (blank.jpg) olarak değiştirir
        cards[optionOneID].setAttribute('src', 'images/blank.jpg')
        cards[optionTwoID].setAttribute('src', 'images/blank.jpg')
    }

    // Skoru günceller
    score.textContent = cardWon.length

    // Eğer tüm kartlar eşleştirildiyse oyunu bitirir
    if(cardWon.length == cardArray.length/2)
    {
        score.innerHTML = 'Tebrikler Kazandınız!' // Kazandınız mesajını gösterir
    }
}

// Kartı çeviren (flip) fonksiyon
function flipCard()
{
    // Kartın kimliğini alır
    const cardID = this.getAttribute('data-id')
    
    // Seçilen kartın adını ve kimliğini ilgili dizilere ekler
    cardChosen.push(cardArray[cardID].name)
    cardChosenID.push(cardID)
    
    // Kartın görüntüsünü seçilen kartın görüntüsü (img) olarak değiştirir
    this.setAttribute('src', cardArray[cardID].img)

    // Eğer iki kart seçildiyse, eşleşmeyi kontrol eder
    if(cardChosen.length ==2)
    {
        setTimeout(checkMatch, 500) // Kontrolü 0.5 saniye (500ms) sonra yapar
    }
}
