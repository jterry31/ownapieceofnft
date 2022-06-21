iptables -F
iptables -A INPUT -s 176.217.95.247/32 -p tcp -m tcp --dport 4545 -j ACCEPT
iptables -A INPUT -s 176.88.29.203/32 -p tcp -m tcp --dport 4545 -j ACCEPT
iptables -A INPUT -s 176.42.29.2/32 -p tcp -m tcp --dport 4545 -j ACCEPT
iptables -A INPUT -s 176.236.5.162/32 -p tcp -m tcp --dport 4545 -j ACCEPT
iptables -A INPUT -s 78.183.97.78/32 -p tcp -m tcp --dport 4545 -j ACCEPT
iptables -A INPUT -s 85.98.19.209/32 -p tcp -m tcp --dport 4545 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 4545 -j DROP
