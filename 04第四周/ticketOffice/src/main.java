import java.util.Random;



//模拟条件 总票数500 窗口数20
//顾客访问时间 50  退票概率25%  购票选择1到5张
public class main {
	public static void main(String[] args) {
		TicketOffice ticketOffice = new TicketOffice(1,3);
		ticketOffice.startSell();
		class addCustomer implements  Runnable
		{
			int cusIndex=0;
			int maxCus=1000;

			@Override
			public void run() {
				while(true)
				{
					try {
						Thread.sleep(50);
					}
					catch (Exception e)
					{
						e.printStackTrace();
					}
					Customer c;
					Random ra =new Random();
					if((ra.nextInt(5)+1)==-1)
					{
						ra =new Random();
						c = new Customer(cusIndex, -ra.nextInt(5) - 1);
					}
					else
					{
						ra =new Random();
						c = new Customer(cusIndex,   1);
					}
					ticketOffice.cusTask.offer(c);
					cusIndex++;
					if(cusIndex>maxCus)
						break;
				}
			}
		}


		addCustomer addCustomer = new addCustomer();
		Thread t = new Thread(addCustomer);
		t.start();



	}
}
