const { throws } = require("assert");

module.exports = {

    timeZoneService: (hour, zone) => {
        try {
            let splitHour = hour.split(":")
            console.log(splitHour);
            var mydate = new Date();
            mydate.setHours(splitHour[0]);
            mydate.setMinutes(splitHour[1]);
            
            var timezone = "";
            //verigicamos el tipo de zona que desea montar
            if(zone.split(":").length > 1) {
                let p = zone.split(":")
                console.log(p[0][0]+p[1]);
                timezone = (p[0] *60)+ (Number(p[0][0]+p[1]))
            }else{
                timezone = zone * 60
            }
        
            var offset = (mydate.getTimezoneOffset() + timezone) * 60 * 1000;
            var timestamp = mydate.getTime() + offset,
              minutes = Math.floor(timestamp / 1000 / 60) % 60;
        
            // Or update the timestamp to reflect the timezone offset.
            mydate.setTime(mydate.getTime() + offset);
            // Then Output dates and times using the normal methods.
            var hour = mydate.getHours();
        
              console.log(hour + ":" + minutes);
             // console.log(hour);
              return minutes
        } catch (error) {
            console.log(error);
            throw ["error"]
        }
   
  },
};
