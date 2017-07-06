#!/usr/bin/python
# coding=UTF-8

from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#TODO REMOVE pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_HEAD = 2 
SERVO_MIN_HEAD = 165  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_HEAD = 305  # Middle pulse length out of 4096
SERVO_MAX_HEAD = 450  # Max pulse length out of 4096 POSITION HAUTE

pwm.setPWMFreq(50) # Set frequency to 50Hz

def leftAndRigthHead(sleep = 1):
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MIDDLE_HEAD)
  print "Tête à moitié tournée à droite"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MAX_HEAD)
  print "Tête complétement tournée à droite"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MIN_HEAD)
  print "Tête à moitié tournée à gauche"
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MIDDLE_HEAD)
  print "Tête complétement tournée à gauche"
  time.sleep(sleep)

leftAndRigthHead()
time.sleep(1)
