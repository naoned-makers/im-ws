
let Rx = require('rxjs/Rx');

var entities = {};
/**
 * leftarm entity domain
 * execute validation and consequential logic
 */
entities.leftarmEntity = function (client, entityCommand, playLoad) {
    //HITEC HS-5645MG 50Hz LEFT ARM
    const CHANNEL_LEFT_ARM = 0;
    const SERVO_MIN_LEFT_ARM = '170';  // Min pulse length out of 4096 POSITION BASSE
    const SERVO_MIDDLE_LEFT_ARM = '280';  // Middle pulse length out of 4096
    const SERVO_MAX_LEFT_ARM = '350';  // Max pulse length out of 4096 POSITION HAUTE 
    const SLEEP = 1000; // milliseconds between instructions   
    if (entityCommand == 'move') {

        Rx.Observable
            .from([SERVO_MIN_LEFT_ARM, SERVO_MIDDLE_LEFT_ARM, SERVO_MAX_LEFT_ARM, SERVO_MIN_LEFT_ARM])
            //.interval(SLEEP)
            .subscribe(function (pwmpulse) {
                client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_LEFT_ARM, pwmpulse);
            })
        /** 
        client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_LEFT_ARM, SERVO_MIN_LEFT_ARM);
        console.log("  Bras gauche complétement baissé");
        //time.sleep(sleep)
        client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_LEFT_ARM, SERVO_MIDDLE_LEFT_ARM);
        console.log("  Bras gauche à moitié levé");
        //time.sleep(sleep)
        client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_LEFT_ARM, SERVO_MAX_LEFT_ARM);
        console.log("  Bras gauche complétement levé");
        //time.sleep(sleep)
        client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_LEFT_ARM, SERVO_MIN_LEFT_ARM);
        console.log("  Bras gauche complétement baissé");
        //time.sleep(sleep)
        */
    }
}
/**
 * head entity domain
 * execute validation and consequential logic
 */
entities.headEntity = function (client, entityCommand, playLoad) {
    //HITEC HS-5645MG 50Hz LEFT ARM
    const CHANNEL_HEAD = 2;
    const SERVO_MIN_HEAD = '165';//Min pulse length out of 4096 POSITION BASSE
    const SERVO_MIDDLE_HEAD = '305';// Middle pulse length out of 4096
    const SERVO_MAX_HEAD = '450';// Max pulse length out of 4096 POSITION HAUTE

    client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_HEAD, SERVO_MIDDLE_HEAD);
    console.log("   Tête à moitié tournée à droite");
    //time.sleep(sleep)
    client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_HEAD, SERVO_MAX_HEAD);
    console.log("   Tête complétement tournée à droite");
    //time.sleep(sleep)
    client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_HEAD, SERVO_MIN_HEAD);
    console.log("   Tête à moitié tournée à gauche");
    //time.sleep(sleep)
    client.publish("im/rpiheart/pwmbreakout/" + CHANNEL_HEAD, SERVO_MIDDLE_HEAD);
    console.log("   Tête complétement tournée à gauche");
    //time.sleep(sleep)
}
/**
* lefthand entity domain
* execute validation and consequential logic
*/
entities.lefthandEntity = function (client, entityCommand, playLoad) {

}


entities.leftarmEntity(
    { publish: console.log }
    , 'move'
    , { "status": "iron man lève le bras gauche", "origin": "im-web" }
);
module.exports = entities;