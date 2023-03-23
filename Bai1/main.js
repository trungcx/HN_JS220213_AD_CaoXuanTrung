
let outputReview = document.getElementById('reviewContainer');

let listReview = JSON.parse(localStorage.getItem('listReview'));
let editFlag = -1;
let starNumberGlobal = 0;
// Get Star Number
const starButtons = document.getElementsByClassName('star');
const buttonPressed = e => {
    let text = e.target.id;
    
    // console.log(text.slice(5,text.length));
    starNumberGlobal = text.slice(5,text.length)
}
for(let starButton of starButtons){
    starButton.addEventListener('click',buttonPressed);
}
function returnStarNumber(starNumber){
    
}

// Add to localStorage
function addReviewBtn(){
    let inputReview = document.getElementById('commentEditor').value;
    // let inputStar = 0;
    let review = {
        reviewContent: inputReview,
        reviewStar: starNumberGlobal
    }
    if(listReview == null){
        listReview = [];
        listReview.push(review);
        localStorage.setItem('listReview',JSON.stringify(listReview))
    } else{
        if(editFlag >= 0){
            listReview[editFlag].reviewContent = inputReview;
            listReview[editFlag].reviewStar = starNumberGlobal;
            editFlag = -1;
        } else{
            listReview.push(review);
        }
        localStorage.setItem('listReview',JSON.stringify(listReview));
    }
    displayReview();

}
// Display review
displayReview();
function displayReview(){

    let result = ` `;
    let starPoint = 0;
    listReview = JSON.parse(localStorage.getItem('listReview'));
    for(let i in listReview){
        result += `
                    <div class="reviewItem">
                        <i class="themify_icon ti-pencil-alt" onclick="editReview(${i})"></i>
                        <i class="themify_icon ti-close" onclick="deleteReview(${i})"></i>
                        <span class="star2">${listReview[i].reviewStar}</span>
                        <p>${listReview[i].reviewContent}</p>
                        
                    </div>      
                    `
        starPoint += parseInt(listReview[i].reviewStar);        
    }
    document.getElementById('reviewContainer').innerHTML = result;
    document.getElementById('reviewAmount').innerHTML = `${listReview.length} Reviews`;
    document.getElementById('starAverage').innerHTML = `Average rating: ${(starPoint/parseInt(listReview.length)).toFixed(2)}`
    
}

//delete review
function deleteReview(index){
    listReview = JSON.parse(localStorage.getItem('listReview'));
    listReview.splice(index,1);
    localStorage.setItem('listReview',JSON.stringify(listReview));
    displayReview();
}
//edit review
function editReview(index){
    editFlag = index;
    listReview = JSON.parse(localStorage.getItem('listReview'));

    document.getElementById('commentEditor').value = listReview[index].reviewContent;
}


