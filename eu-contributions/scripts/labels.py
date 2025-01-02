@qgsfunction(args='auto', group='Custom')
def flag_only_calculate_saldo_offset(revenue, spending, saldo, feature, parent):
    len_spending = len(str(abs(round(spending))))
    len_revenue = len(str(abs(round(revenue))))
    len_saldo = len(str(abs(round(saldo))))

    max_letters = max(len_spending, len_revenue)
    
    if max_letters == 2 or max_letters == 3:
        return '-3.6, -2'
    elif max_letters == 4:
        return '-5, -2'
    elif max_letters == 5:
        return '-6, -2'
    else:
        return '0,0'

@qgsfunction(args='auto', group='Custom')
def flag_only_calculate_revenue_offset(revenue, spending, saldo, feature, parent):
    len_spending = len(str(abs(round(spending))))
    len_revenue = len(str(abs(round(revenue))))
    len_saldo = len(str(abs(round(saldo))))
    
    if len_revenue == 2 or len_revenue == 3:
        return '-2.6, -2.4'
    elif len_revenue == 4:
        return '-3.2, -2.4'
    elif len_revenue == 5:
        return '-3.8, -2.4'
    else:
        return '0,0'

@qgsfunction(args='auto', group='Custom')
def flag_only_calculate_spending_offset(revenue, spending, saldo, feature, parent):
    len_spending = len(str(abs(round(spending))))
    len_revenue = len(str(abs(round(revenue))))
    len_saldo = len(str(abs(round(saldo))))
    
    if len_spending == 2 or len_spending == 3:
        return '-2.6, -2.4'
    elif len_spending == 4:
        return '-3.2, -2.4'
    elif len_spending == 5:
        return '-3.8, -2.4'
    else:
        return '0,0'


@qgsfunction(args='auto', group='Custom')
def flag_only_calculate_saldo_offset(revenue, spending, saldo, feature, parent):
    len_spending = len(str(abs(round(spending))))
    len_revenue = len(str(abs(round(revenue))))
    len_saldo = len(str(abs(round(saldo))))
    
    if len_saldo == 2 or len_saldo == 3:
        return '-2, 1'
    elif len_saldo == 4:
        return '-3, 1'
    elif len_saldo == 5:
        return '-4, 1'
    else:
        return '0, 0'