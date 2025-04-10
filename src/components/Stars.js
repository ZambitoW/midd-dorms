//Imports

export default function Stars({ rating }){
    const stars = [];
    for (let i=0; i<10; i++){
        if(i+1 <= rating){
            stars.push("★");
        } else {
            stars.push("☆");
        }
    }


    return(
        <div>
            {stars.join("")}
        </div>
    )
}
