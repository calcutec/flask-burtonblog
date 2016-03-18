#!/usr/bin/python
class Parent(object):        # define parent class
    parentAttr = 100

    def __init__(self):
        print "Calling parent constructor"

    def parent_method(self):
        print 'Calling parent method'

    def set_attr(self, attr):
        Parent.parentAttr = attr

    def get_attr(self):
        print "Parent attribute :", Parent.parentAttr


class Child(Parent):  # define child class
    def __init__(self):
        super(Parent, self).__init__()
        print "Calling child constructor"

    def child_method(self):
        print 'Calling child method'

c = Child()          # instance of child
c.child_method()      # child calls its method
c.parent_method()     # calls parent's method
c.set_attr(200)       # again call parent's method
c.get_attr()          # again call parent's method