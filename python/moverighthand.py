#!/usr/bin/python
# coding=UTF-8

from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#TODO REMOVE pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz RIGHT ARM
CHANNEL_RIGHT_HAND = 4
SERVO_MIN_RIGHT_HAND = 240  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_RIGHT_HAND = 360  # Middle pulse length out of 4096
SERVO_MAX_RIGHT_HAND = 440  # Max pulse length out of 4096 POSITION HAUTE

pwm.setPWMFreq(50) # Set frequency to 50Hz

def upAndDownRightHand(sleep = 1):
<<<<<<< HEAD
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main droite à moitié tournée"
||||||| merged common ancestors
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main gauche à moitié tournée"
=======
  pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main droite à moitié tournée"
>>>>>>> 9e5c7c0485ba88f4984de0c40b4f7855449e1584
  time.sleep(sleep)
<<<<<<< HEAD
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MAX_RIGHT_HAND)
  print "Main droite à complétement tournée"
||||||| merged common ancestors
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MAX_RIGHT_HAND)
  print "Main gauche à complétement tournée"
=======
  pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MAX_RIGHT_HAND)
  print "Main droite à complétement tournée"
>>>>>>> 9e5c7c0485ba88f4984de0c40b4f7855449e1584
  time.sleep(sleep)
<<<<<<< HEAD
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main droite à moitié tournée"
||||||| merged common ancestors
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main gauche à moitié tournée"
=======
  pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIN_RIGHT_HAND)
  print "Main droite à moitié tournée"
>>>>>>> 9e5c7c0485ba88f4984de0c40b4f7855449e1584
  time.sleep(sleep)
<<<<<<< HEAD
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIN_RIGHT_HAND)
  print "Main droite à complétement tourné"
||||||| merged common ancestors
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIN_RIGHT_HAND)
  print "Main gauche à complétement tourné"
=======
  pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main droite à complétement tourné"
>>>>>>> 9e5c7c0485ba88f4984de0c40b4f7855449e1584
  time.sleep(sleep)

upAndDownRightHand()
time.sleep(1)
