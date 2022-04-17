# Solana Accounts

Accounts in Solana can either be executable - which don't store data - or data - which do. Intuitively, they are responsible for their respective contrived behavior.

## Example: Hotel

![](doc/hotel.png)

### Data Account

```shell
./src/guests_list
```
Only the owner of an account may modify its data.    
Accounts may only be assigned a new owner if their data is zeroed out.

### Executable Accounts

```shell
./src/check_in
./src/guests_report
```
Immutable. Programs cannot add lamports to executable accounts and their data can never be modified or deleted.