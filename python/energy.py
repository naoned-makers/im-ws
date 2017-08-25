#!/usr/bin/python
# coding=UTF-8

# TODO REMOVE from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
#pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
# TODO REMOVE pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_ENERGY = 0

# TODO REMOVE pwm.setPWMFreq(50) # Set frequency to 50Hz

def lightUpEnergy(sleep = 1):
  # TODO REMOVE pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MIDDLE_HEAD)
  print "Allume les LED du torse"
  time.sleep(sleep)

lightUpEnergy()
time.sleep(1)
