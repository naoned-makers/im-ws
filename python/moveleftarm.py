#!/usr/bin/python
# coding=UTF-8

#TODO REMOVE from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
#pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#TODO REMOVE pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_LEFT_ARM = 0
SERVO_MIN_LEFT_ARM = 165  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_LEFT_ARM = 305  # Middle pulse length out of 4096
SERVO_MAX_LEFT_ARM = 450  # Max pulse length out of 4096 POSITION HAUTE

#TODO REMOVE pwm.setPWMFreq(50) # Set frequency to 50Hz

def upAndDownLeftArm(sleep = 1):
  #TODO REMOVE pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIDDLE_LEFT_ARM)
  print "Bras gauche à moitié levé"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MAX_LEFT_ARM)
  print "Bras gauche à complétement levé"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIDDLE_LEFT_ARM)
  print "Bras gauche à moitié levé"
  time.sleep(sleep)
  #TODO REMOVE pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIN_LEFT_ARM)
  print "Bras gauche à complétement baissé"
  time.sleep(sleep)

upAndDownLeftArm()
time.sleep(1)
