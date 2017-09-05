#!/usr/bin/python
# coding=UTF-8

# TODO from Adafruit_PWM_Servo_Driver import PWM

# Initialise the PWM device using the default address
# TODO pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
# TODO REMOVE pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_HEAD = 2 
SERVO_MIN_HEAD = 165  # Min pulse length out of 4096 POSITION BASSE
#SERVO_MIDDLE_HEAD = 305  # Middle pulse length out of 4096
SERVO_MAX_HEAD = 450  # Max pulse length out of 4096 POSITION HAUTE

# TODO pwm.setPWMFreq(50) # Set frequency to 50Hz

def setServo(percent = 0):
  servopulse = SERVO_MIN_HEAD + percent*(SERVO_MAX_HEAD - SERVO_MIN_HEAD)/100
  print "CHANNEL_HEAD:"+str(CHANNEL_HEAD)+" setPWM:"+str(servopulse)
  # TODO pwm.setPWM(CHANNEL_HEAD, 0, servopulse)