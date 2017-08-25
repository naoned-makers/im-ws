#!/usr/bin/python
# coding=UTF-8

from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_LEFT_ARM = 0
SERVO_MIN_LEFT_ARM = 170  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_LEFT_ARM = 280  # Middle pulse length out of 4096
SERVO_MAX_LEFT_ARM = 350  # Max pulse length out of 4096 POSITION HAUTE

pwm.setPWMFreq(50) # Set frequency to 50Hz

def upAndDownLeftArm(sleep = 1):
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIN_LEFT_ARM)
  print "Bras gauche à complétement baissé"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIDDLE_LEFT_ARM)
  print "Bras gauche à complétement levé"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MAX_LEFT_ARM)
  print "Bras gauche à complétement baissé"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIN_LEFT_ARM)
  time.sleep(sleep)



upAndDownLeftArm()
time.sleep(1)
