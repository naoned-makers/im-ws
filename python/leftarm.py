#!/usr/bin/python
# coding=UTF-8

#TODO from Adafruit_PWM_Servo_Driver import PWM

# Initialise the PWM device using the default address
#TODO pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
#pwm = PWM(0x40, debug=True)


# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_LEFT_ARM = 0
SERVO_MIN_LEFT_ARM = 170  # Min pulse length out of 4096 POSITION BASSE
#SERVO_MIDDLE_LEFT_ARM = 280  # Middle pulse length out of 4096
SERVO_MAX_LEFT_ARM = 350  # Max pulse length out of 4096 POSITION HAUTE

# TODO pwm.setPWMFreq(50) # Set frequency to 50Hz

def setServo(percent = 0):
  servopulse = SERVO_MIN_LEFT_ARM + percent*(SERVO_MAX_LEFT_ARM - SERVO_MIN_LEFT_ARM)/100
  print "CHANNEL_LEFT_ARM:"+str(CHANNEL_LEFT_ARM)+" setPWM:"+str(servopulse)
  # TODO pwm.setPWM(CHANNEL_LEFT_ARM, 0, servopulse)
