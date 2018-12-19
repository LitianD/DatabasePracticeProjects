import java.util.LinkedList;
import java.util.Queue;

public class TicketOffice {

	public Queue<Customer> cusTask;
	int ticketTotal;
	int winNum;

	TicketOffice(int ticketTotal,int winNum)
	{
		this.ticketTotal = ticketTotal;
		this.winNum = winNum;
		cusTask =  new LinkedList<Customer>();
	}

	public void startSell()
	{
		Ticket t = new Ticket(ticketTotal);

		for(int i = 0;i<winNum;i++)
		{
			System.out.println("售票窗口"+i+"号开启！");
			sellTicket sellTicket = new sellTicket(t,i);
			Thread thread = new Thread(sellTicket);
			thread.start();
		}
	}

	class Ticket
	{
		public int total=0;
		int count=0;

		Ticket(int total)
		{
			this.total = total;
		}

		public synchronized boolean sell(int winNum)
		{
			int cus=0;
			if(!cusTask.isEmpty())
			{
				cus = cusTask.poll().getTicket();
				if(total-cus>=0) {

					total = total - cus;
					if(cus>0)
						System.out.println("窗口编号："+winNum +"  顾客编号："+count+ "  售出： " + cus + "  余票：" + total+"   等待顾客数："+cusTask.size());
					else
						System.out.println("窗口编号："+winNum +"  顾客编号："+count +"  退票：" + cus + "  余票：" + total+"   等待顾客数："+cusTask.size());
					count++;
					return true;
				}
				else
				{
					return false;
				}
			}
			//System.out.println("无顾客");

			return true;
		}
	}

	class sellTicket implements  Runnable
	{
		private Ticket ticket;
		private int winNum;
		private boolean ifStop;

		public sellTicket(Ticket ticket,int num)
		{
			this.ticket=ticket;
			this.winNum = num;
		}
		public void run()
		{
			while(true)
			{
				try
				{
					Thread.sleep(1000);
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
				if(!cusTask.isEmpty()) {

					ifStop = ticket.sell(winNum);
					if(!ifStop)
					{
						System.out.println("窗口"+winNum+"停售");
						break;
					}
				}
				else
				{
					//System.out.println("无顾客" );
				}

			}
		}
	}

}
