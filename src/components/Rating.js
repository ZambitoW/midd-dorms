//need imports

export default function Rating({ currentRoom }) {
    return (
        <div>
            <h1>{currentRoom.building}</h1>
            <h1>{currentRoom.roomType}</h1>
            <h2>Overall Rating</h2>
            <Stars rating={currentRoom.overallRating}/>
            <h2>Storage Space</h2>
            <Stars rating={currentRoom.storage}/>
            <h2>Size</h2>
            <Stars rating={currentRoom.size}/>
            <h2>Noise</h2>
            <Stars rating={currentRoom.noise}/>
            <h2>Dining Hall Proximity</h2>
            <Stars rating={currentRoom.dining_hall}/>
            <h2>Athletic Center Proximity</h2>
            <Stars rating={currentRoom.athletic_center}/>
            <h2>Public Bathrooms</h2>
            <Stars rating={currentRoom.bathrooms}/>
            <h2>Public Kitchens</h2>
            <Stars rating={currentRoom.kitchens}/>
            <h2>Elevators</h2>
            <Stars rating={currentRoom.elevators}/>
            <h2>Laundry</h2>
            <Stars rating={currentRoom.laundry}/>
        </div>
 
    );
  }