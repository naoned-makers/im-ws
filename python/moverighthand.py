#!/usr/bin/python
# coding=UTF-8

#TODO REMOVE from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
#pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#TODO REMOVE pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz RIGHT ARM
CHANNEL_RIGHT_HAND = 0
SERVO_MIN_RIGHT_HAND = 165  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_RIGHT_HAND = 305  # Middle pulse length out of 4096
SERVO_MAX_RIGHT_HAND = 450  # Max pulse length out of 4096 POSITION HAUTE

#TODO REMOVE pwm.setPWMFreq(50) # Set frequency to 50Hz

def upAndDownRightHand(sleep = 1):
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main droite à moitié tournée"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MAX_RIGHT_HAND)
  print "Main droite à complétement tournée"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIDDLE_RIGHT_HAND)
  print "Main droite à moitié tournée"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_HAND, 0, SERVO_MIN_RIGHT_HAND)
  print "Main droite à complétement tourné"
  time.sleep(sleep)

upAndDownRightHand()
time.sleep(1)
