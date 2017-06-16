#!/usr/bin/python
# coding=UTF-8

#TODO REMOVE from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
#pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#TODO REMOVE pwm = PWM(0x40, debug=True)

# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_RIGHT_ARM = 0 # TODO MODIFIER LE CHANNEL
SERVO_MIN_RIGHT_ARM = 165  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_RIGHT_ARM = 305  # Middle pulse length out of 4096
SERVO_MAX_RIGHT_ARM = 450  # Max pulse length out of 4096 POSITION HAUTE

#TODO REMOVE pwm.setPWMFreq(50) # Set frequency to 50Hz

def upAndDownRightArm(sleep = 1):
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_ARM, 0, SERVO_MIDDLE_RIGHT_ARM)
  print "Bras droit à moitié levé"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_ARM, 0, SERVO_MAX_RIGHT_ARM)
  print "Bras droit à complétement levé"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_ARM, 0, SERVO_MIDDLE_RIGHT_ARM)
  print "Bras droit à moitié levé"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_RIGHT_ARM, 0, SERVO_MIN_RIGHT_ARM)
  print "Bras droit à complétement baissé"
  time.sleep(sleep)

# Leve et baisse le bras droit ...
upAndDownRightArm()
time.sleep(2)