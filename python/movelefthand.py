#!/usr/bin/python
# coding=UTF-8

from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#TODO REMOVE pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_LEFT_HAND = 5
SERVO_MIN_LEFT_HAND = 160  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_LEFT_HAND = 240  # Middle pulse length out of 4096
SERVO_MAX_LEFT_HAND = 350  # Max pulse length out of 4096 POSITION HAUTE

pwm.setPWMFreq(50) # Set frequency to 50Hz

def upAndDownLeftHand(sleep = 1):
  pwm.setPWM(CHANNEL_LEFT_HAND, 0, SERVO_MIDDLE_LEFT_HAND)
  print "Main gauche à moitié tournée"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_HAND, 0, SERVO_MAX_LEFT_HAND)
  print "Main gauche à complétement tournée"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_HAND, 0, SERVO_MIN_LEFT_HAND)
  print "Main gauche à moitié tournée"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_HAND, 0, SERVO_MIDDLE_LEFT_HAND)
  print "Main gauche à complétement tourné"
  time.sleep(sleep)

upAndDownLeftHand()
time.sleep(1)
